class User {
  name!: string;
  password!: string;
  email!: string;
  carType!: string;
  latitude!: string;
  longitude!: string;
}

type Request = {
  body: User;
  params: { userId: string };
};
export { User, Request };
