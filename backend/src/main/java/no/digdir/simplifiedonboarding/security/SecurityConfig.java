package no.digdir.simplifiedonboarding.security;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http){
        http
                .cors().configurationSource(request -> {
                    CorsConfiguration configuration = new CorsConfiguration();
                    configuration.setAllowedOrigins(List.of("http://localhost:3000"));
                    configuration.setAllowedMethods(List.of("*"));
                    configuration.setAllowedHeaders(List.of("*"));
                    configuration.setAllowCredentials(true);
                    return configuration;
                });
        http.csrf().disable();
        return http.build();
    }

    /*@Bean
    public SecurityFilterChain filterChain(HttpSecurity http, ClientRegistrationRepository repo)
            throws Exception {

        //var base_uri = OAuth2AuthorizationRequestRedirectFilter.DEFAULT_AUTHORIZATION_REQUEST_BASE_URI;
        //var resolver = new DefaultOAuth2AuthorizationRequestResolver(repo, base_uri);

        //resolver.setAuthorizationRequestCustomizer(OAuth2AuthorizationRequestCustomizers.withPkce());

        //http.oauth2Login(login -> login.authorizationEndpoint().authorizationRequestResolver(resolver));

        //http.logout(logout -> logout
        //        .logoutSuccessUrl("/"));

        return http.build();
    }*/


}
