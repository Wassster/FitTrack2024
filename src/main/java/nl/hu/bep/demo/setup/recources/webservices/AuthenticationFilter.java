package nl.hu.bep.demo.setup.recources.webservices;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import nl.hu.bep.demo.setup.recources.model.FitTrack;
import nl.hu.bep.demo.setup.recources.model.User;

import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.ext.Provider;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

    @Override
    public void filter(ContainerRequestContext requestCtx) {

        boolean isSecure = requestCtx.getSecurityContext().isSecure();
        String scheme = requestCtx.getUriInfo().getRequestUri().getScheme();

        MySecurityContext msc = null;

        String authHeader = requestCtx.getHeaderString(HttpHeaders.AUTHORIZATION);
        if (authHeader != null && authHeader.startsWith("Bearer")) {
            System.out.println("hier");
            String token = authHeader.substring("Bearer".length()).trim();
            try {

                JwtParser parser = Jwts.parser().setSigningKey(RegisterResource.KEY);
                Claims claims = parser.parseClaimsJws(token).getBody();
                System.out.println(claims);

                String username = claims.getSubject();
                User user = FitTrack.getUserByName(username);
                if (user != null) {
                    msc = new MySecurityContext(user, scheme);
                }
            } catch (JwtException | IllegalArgumentException e) {
                System.out.println("Invalid JWT, processing as guest!");
            }
        }else{
            System.out.println("hij gaat er niet doorheen");
        }

        if (msc == null) {

            msc = new MySecurityContext(null, scheme);
        }


        requestCtx.setSecurityContext(msc);
        System.out.println("doorheen");
    }
}
