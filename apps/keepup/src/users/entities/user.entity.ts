import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

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
  @Prop({ type: String, required: true })
  password: string;

  comparePassword: (candidatePassword: string) => boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.pre<User>('validate', async function () {
//   this.fullname = [this.firstname, this.lastname].join(' ');
// });
UserSchema.virtual('fullname')
  .get(function () {
    return [this.firstname, this.lastname].join(' ');
  })
  .set(function (v) {
    // `v` is the value being set, so use the value to set
    // `firstName` and `lastName`.
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
