export const runtime = "nodejs"
import { NextRequest } from 'next/server';
import Client from 'node-regon';

export async function GET(request: NextRequest) {
    try {

        const gus = Client.createClient({
            key: "a7adff95acec48cc98da",
            birVersion: '1.1',
            captcha: {
                autofill: false,
                apiKey: "ANTIGATE_API"
            }
        });

        // Ensure the client is initialized properly
        if (!gus) {
            throw new Error("Client initialization failed");
        }

        // Assuming findByNip is an async function
        const companyInfoByNip = await gus.findByNip("6762264686");

        console.log(companyInfoByNip);

        return new Response(JSON.stringify(companyInfoByNip), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(error);

        return new Response("Internal Server Error", { status: 500 });
    }
}