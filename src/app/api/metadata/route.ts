import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  // 1. Extraemos el URL que nos manda el frontend desde los parámetros de búsqueda
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  // Validamos que sí nos hayan mandado un link
  if (!targetUrl) {
    return NextResponse.json(
      { error: "Se requiere un parámetro 'url' (ej: ?url=https://open.spotify.com/...)" },
      { status: 400 }
    );
  }

  try {
    // 2. Hacemos la petición HTTP a Spotify, Apple Music, o la página que sea
    const response = await fetch(targetUrl, {
      // Fingimos ser un navegador normal para que las plataformas no bloqueen la petición
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Fallo al cargar la página: ${response.status}`);
    }

    // 3. Obtenemos el HTML crudo
    const html = await response.text();

    // 4. Cargamos el HTML en Cheerio para poder manipularlo como si fuera jQuery
    const $ = cheerio.load(html);

    // 5. Extraemos la "carnita" (Open Graph tags)
    // Buscamos <meta property="og:title" content="...">
    const title = $('meta[property="og:title"]').attr("content") || $("title").text() || "Sin título";
    const description = $('meta[property="og:description"]').attr("content") || "";
    const image = $('meta[property="og:image"]').attr("content") || "";

    // Parseo extra para plataformas de música (normalmente el título viene como "Canción - Artista")
    let artist = "Artista Desconocido";
    let cleanTitle = title;

    if (title.includes(" - ")) {
      const parts = title.split(" - ");
      cleanTitle = parts[0].trim();
      artist = parts[1].trim();
    } else if (title.includes(" by ")) {
      const parts = title.split(" by ");
      cleanTitle = parts[0].trim();
      artist = parts[1].trim();
    }

    // 6. Devolvemos el objeto estructurado listo para que el frontend lo consuma
    return NextResponse.json({
      success: true,
      data: {
        title: cleanTitle,
        artist: artist,
        description: description,
        coverImage: image,
        platformUrl: targetUrl,
      }
    });

  } catch (error) {
    console.error("Error en la API de metadata:", error);
    return NextResponse.json(
      { error: "Error interno al procesar el URL" },
      { status: 500 }
    );
  }
}