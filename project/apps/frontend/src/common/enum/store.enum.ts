enum AppRoute {
  Main = '/',
  Intro = '/intro',
  Register = '/register',
  Login = '/login',
  Product = '/product',
  Catalog = '/catalog',
  NotFound = '*',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum NameSpace {
  App = 'APP',
  User = 'USER',
  Users = 'USERS',
  Product = 'PRODUCT',
  Products = 'PRODUCTS',
}

enum APIRoute {
  Products = '/products',
  Product = '/products/{offerId}',
  Login = '/auth/login',
  Register = '/auth/register',
  Users = '/users',
}

enum RequestStatus {
  Idle = 'idle',
  Pending = 'pending',
  Success = 'success',
  Error = 'error',
}

export {
  AppRoute,
  AuthorizationStatus,
  NameSpace,
  APIRoute,
  RequestStatus,
};
