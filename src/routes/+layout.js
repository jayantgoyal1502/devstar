import tools from './tools.json';

// @ts-ignore
export async function load({ route, url }) {
    return {
        tools: tools,
        meta: getMeta(route, url)
    };
}

// @ts-ignore
function getMeta(route, url) {
    if (route.id && route.id.includes("(tools)")) {
        // Remove leading slash from pathname
        const pathKey = url.pathname.replace("/", "");
        
        // @ts-ignore
        const tool = tools[pathKey];

        if (!tool) {
            console.error(`Tool not found for path: ${url.pathname}`);
            return {
                title: 'Random Word Generator',
                description: 'It generates random words.',
                contributors: []
            };
        }

        return {
            title: tool.name,
            description: tool.description,
            contributors: tool.contributors
        };
    }

    return 0;
}
