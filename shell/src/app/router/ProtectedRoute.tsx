type ProtectedRouteProps = {
    children: React.ReactNode;
  };
  
  export function ProtectedRoute({
    children,
  }: Readonly<ProtectedRouteProps>) {
    return children;
  }