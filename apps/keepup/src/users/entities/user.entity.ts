import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Circle } from '../../circles/entities/circle.entity';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User extends Document {
  @Prop({ type: String, required: true, index: true, unique: true })
  username: string;
  @Prop({ type: String, required: true })
  firstname: string;
  @Prop({ type: String, required: true })
  lastname: string;
  @Prop({ type: String, required: true, index: true, unique: true })
  email: string;
  @Prop({ type: Boolean, required: true, default: false })
  online: boolean;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Circle' })
  circle: Circle;

  comparePassword: (candidatePassword: string) => boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('fullname')
  .get(function () {
    return [this.firstname, this.lastname].join(' ');
  })
  .set(function (v) {
    const firstName = v.substring(0, v.indexOf(' '));
    const lastName = v.substring(v.indexOf(' ') + 1);
    this.set({ firstName, lastName });
  });

UserSchema.pre<User>('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  const user = this as User;
  return bcrypt.compare(candidatePassword, user.password);
};
