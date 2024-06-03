package nl.hu.bep.demo.setup.recources.webservices;

import nl.hu.bep.demo.setup.recources.model.User;

import javax.ws.rs.core.SecurityContext;
import java.security.Principal;

public class MySecurityContext implements SecurityContext {
    private User user;
    private String scheme;

    public MySecurityContext(User user, String scheme) {
        this.user = user;
        this.scheme = scheme;
    }

    public Principal getUserPrincipal() {
        return (Principal) this.user;
    }

    @Override
    public boolean isUserInRole(String s) {
        if (user.getRole() != null) {
            // Controleer of de gebruikersrol overeenkomt met de opgegeven rol
            System.out.printf("%s equals %s", s, user.getRole());
            return s.equals(user.getRole());
        }
        return false;
    }

    @Override
    public boolean isSecure() {
        // Controleer of de verbinding beveiligd is
        return "https".equals(this.scheme);
    }

    @Override
    public String getAuthenticationScheme() {
        // Geef het beveiligingsschema terug
        return SecurityContext.BASIC_AUTH;
    }
}
