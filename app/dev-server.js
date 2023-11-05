require("esbuild-server")
    .createServer(
        {
            bundle: true,
            entryPoints: ["./src/index.ts"],
        },
        {
            static: "public",
        },
    )
    .start();