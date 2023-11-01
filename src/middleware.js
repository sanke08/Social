import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // publicRoutes:["/"]
  publicRoutes:["/:path*","/profile/6501f025f181baea2702994c"]
 
});


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
