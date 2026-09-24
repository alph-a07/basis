# Decisions

## D-1: Library Name (Sept 23 2026)

> **Basis**: A stable, simple, configurable design system for Jetpack Compose.

-   The basis is the foundation on which something else is built.
-   Would look good as a prefix for the API name, e.g., `BasisButton`, `BasisTextField`, etc.

## D-2  License (Sept 23 2026)

- Apache 2.0 License is chosen for the library to ensure that it is open-source and can be freely used, modified, and distributed by developers. This license provides flexibility for both personal and commercial use while protecting the contributors' rights.

## D-3: SDK Policy (Sept 23 2026)

- Demo Module (Demo App)
  - Minimum SDK: 24
  - Target SDK: 36
  - Compile SDK: 37
- Basis Module (Library)
  - Minimum SDK: 24
  - Target SDK: 36
  - Compile SDK: 37
- Basis Lint Module (Lint Rules)
  - Minimum SDK: 24
  - Target SDK: 36
  - Compile SDK: 37

## D-4: Versioning Policy (Sept 24 2026)

- The library will follow Semantic Versioning (SemVer) principles to ensure clear communication of changes and compatibility.
- Versioning Format: The version number will follow the format `MAJOR.MINOR.PATCH`, where:
  - MAJOR version increments indicate incompatible API changes.
  - MINOR version increments indicate the addition of functionality in a backward-compatible manner.
  - PATCH version increments indicate backward-compatible bug fixes.
- Starting Version: `0.1.0` will be the initial version of the library, indicating that it is in the early stages of development and may undergo significant changes.

## D-5: Enabled explicit API mode (Sept 24 2026)

- The library module will enable explicit API mode to enforce clear and intentional API design. This mode requires that all public APIs are explicitly marked with visibility modifiers, ensuring that the library's API surface is well-defined and maintainable.

## D-6: BCV Plugin Enforcement (Sept 24 2026)

- The library will enforce the use of the BCV (Binary Compatibility Validator) plugin to ensure that any changes made to the library do not break binary compatibility with previous versions. This enforcement will help maintain stability and reliability for developers using the library.
- Added additional `bcv-android-bridge` plugin to retain BCV tasks broken by AGP 9.0+

## D-7: `vanniktech` Maven Publishing Plugin (Sept 24 2026)

## D-8: Detekt Lint Plugin (Sept 24 2026)

- Default Detekt configuration will be used for now until we have a better understanding of the library's needs and can create a custom configuration that aligns with our coding standards and best practices. 
- `basis-lint` module will hold custom lint rules for the library.