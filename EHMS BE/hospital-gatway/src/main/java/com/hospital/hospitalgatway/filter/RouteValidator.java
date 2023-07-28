package com.hospital.hospitalgatway.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    public static final List<String> openApiEndpoints = List.of(
            "/auth/register",
            "/auth/token",

            "/auth/all",
            "/auth/validate",
            "/auth/patient",
            "/eureka",
            "/doctor/doctorsAll",
            "/admin/hospital/all",
            "/auth/refreshtoken",
            "/api/register",
            "/api/token",
            "/admin/refreshtoken",
            "/restaurant/all",
            "/admin/registerRecordPerson",
            "/alert/send",
            "/alert/get-alert",
            "/alert/status-update",
            "/get/by",
            "alert/get-alert-count"
    );

    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));

}
