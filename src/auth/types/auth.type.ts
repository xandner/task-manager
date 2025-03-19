import { IncomingHttpHeaders } from 'http';
import { Roles } from 'src/shared/enums/role.enum';

export type ValidatedUser = {
  id: string;
  role: Roles;
  email: string;
};

export type RequestedUser = {
  user?: ValidatedUser;
  header: IncomingHttpHeaders;
  ip: string;
};
