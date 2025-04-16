import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { fileId } = await req.json();

        if (!fileId) {
            return NextResponse.json({ error: 'fileId is required' }, { status: 400 });
        }

        const privateKey = process.env.IMAGEKIT_PRIVATE_KEY!;
        const authHeader = 'Basic ' + Buffer.from(`${privateKey}:`).toString('base64');

        const url = `https://api.imagekit.io/v1/files/${fileId}`;
        const options = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: authHeader
            }
        };
        const response = await fetch(url, options);

        console.log(response);

        return NextResponse.json({ success: true, response });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Erro ao excluir imagem' }, { status: 500 });
    }
}