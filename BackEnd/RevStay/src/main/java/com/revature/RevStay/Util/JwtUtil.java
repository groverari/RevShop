package com.revature.RevStay.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.NoArgsConstructor;
import lombok.experimental.UtilityClass;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@NoArgsConstructor
public class JwtUtil {
    private final String key = "revstay_jwt_secret_key";
    private final SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(key));

    //create JWT token
    public String generateToken(Integer Id) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, Id.toString());
    }

    private String createToken(Map<String, Object> claims, String userId) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userId) // Using subject to store userId as a string
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 Hours token validity
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // Retrieves the userId from the JWT Token
    public Integer getIdFromToken(String token) {
        String id = getClaimFromToken(token, Claims::getSubject);
        return Integer.parseInt(id); // Convert the retrieved string back to Integer
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
}
