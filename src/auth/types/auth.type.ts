import { IncomingHttpHeaders } from 'http';
import { Roles } from 'src/shared/enums/role.enum';

export type ValidatedUser = {
  id: number;
  role: Roles;
  email: string;
};

export type RequestedUser = {
  user?: ValidatedUser;
  header: IncomingHttpHeaders;
  ip: string;
};
