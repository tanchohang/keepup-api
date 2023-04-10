import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, required: true, index: true, unique: true })
  username: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true, index: true, unique: true })
  email: string;
  @Prop({ type: String, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  const user = this as User;
  return bcrypt.compare(candidatePassword, user.password);
};
