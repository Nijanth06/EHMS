package com.hospital.service;

import com.hospital.entity.UserCredential;
import com.hospital.repository.UserCredentialRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.util.*;

import static java.time.Instant.now;


@Component
public class JwtService {
    private static final Logger logger = LoggerFactory.getLogger(JwtService.class);
   // public static final String SECRET = "bezKoderSecretKey";
    public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";
    private int jwtExpirationInMs=3600000;
    private int refreshExpirationDateInMs=9000000;
@Autowired
   private UserCredentialRepository userCredentialRepository;

    public void validateToken(final String token) {
        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
    }


    public String generateToken(Authentication authenticate) {


        Collection<? extends GrantedAuthority> roles = authenticate.getAuthorities();
        Map<String, Object> claims = new HashMap<>();
        System.out.printf(roles.toString());
       Instant  lm=Instant.now().plusMillis(3600000);
       String time= String.valueOf(lm);
        if (roles.contains(new SimpleGrantedAuthority("Admin"))) {
       claims.put("role", "Admin");
          //  claims.put("time", time);
    }
        if (roles.contains(new SimpleGrantedAuthority("User"))) {
            claims.put("role", "User");
            //claims.put("time", time);
        }
        if (roles.contains(new SimpleGrantedAuthority("Doctor"))) {
            claims.put("role", "Doctor");
           // claims.put("time", time);
        }
        if (roles.contains(new SimpleGrantedAuthority("Receptionist"))) {
            claims.put("role", "Receptionist");
            // claims.put("time", time);
        }
        if (roles.contains(new SimpleGrantedAuthority("Nurse"))) {
            claims.put("role", "Nurse");
            // claims.put("time", time);
        }

        if (roles.contains(new SimpleGrantedAuthority("RecordPerson"))) {
            claims.put("role", "RecordPerson");
            // claims.put("time", time);
        }
        return createToken(claims, authenticate.getName());
    }


    public String generateToken(String  username) {

        Optional<UserCredential> userCredential= userCredentialRepository.findByName(username);
       // UserDetails userDetails = customUserDetails.loadUserByUsername(userName);
        Map<String, Object> claims = new HashMap<>();

        claims.put("role", userCredential.get().getRoles());


       // claims.put("name",userDetails.getAuthorities());
        return createToken(claims, username);
    }

    private String createToken(Map<String, Object> claims, String userName) {

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();


        /*return Jwts.builder().setClaims(claims).setSubject(userName).setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + 60000)).signWith(getSignKey(),SignatureAlgorithm.HS512)
                .compact();


         */
    }

    public String doGenerateRefreshToken(Map<String, Object> claims, String subject) {

        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + refreshExpirationDateInMs))
                .signWith(SignatureAlgorithm.HS512, SECRET).compact();

    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        return claims.getSubject();

    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody().getSubject();
    }


    public List<SimpleGrantedAuthority> getRolesFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();

        List<SimpleGrantedAuthority> roles = null;

        String isAdmin = claims.get("role", String.class);
       // Boolean isUser = claims.get("isUser", Boolean.class);

        if (isAdmin != null && isAdmin.equals("Admin")) {
            roles = Arrays.asList(new SimpleGrantedAuthority("Admin"));
        }

//        if (isUser != null && isAdmin) {
//            roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
//        }
        return roles;

    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
