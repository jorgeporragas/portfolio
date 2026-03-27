import * as cheerio from "cheerio";
import { AudioProject } from "@/components/CoverFlow";

export async function getMetadata(
  links: { spotify?: string; apple?: string; tidal?: string }, 
  id: string, 
  customArtist: string, 
  customDescription: string, 
  tags: string[]
): Promise<AudioProject> {
  const primaryUrl = links.spotify || links.apple || links.tidal;

  if (!primaryUrl) {
      throw new Error("Se requiere al menos un link para extraer metadata");
  }

  try {
    const response = await fetch(primaryUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      next: { revalidate: 86400 } 
    });

    if (!response.ok) throw new Error("Fallo la petición");

    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('meta[property="og:title"]').attr("content") || "Sin título";
    const image = $('meta[property="og:image"]').attr("content") || "#1c1917";

    let cleanTitle = title;
    
    // Filtros de limpieza de plataformas
    if (title.includes(", a song by")) cleanTitle = title.split(", a song by")[0];
    else if (title.includes(" - Single by")) cleanTitle = title.split(" - Single by")[0];
    else if (title.includes(" - EP by")) cleanTitle = title.split(" - EP by")[0];
    else if (title.includes(" by ")) cleanTitle = title.split(" by ")[0];
    
    // 2. NUEVO FILTRO: Eliminamos explícitamente " - Album" y marcas comerciales
    cleanTitle = cleanTitle
      .replace(" - Album", "")
      .replace(" | Spotify", "")
      .replace(" on Apple Music", "")
      .trim();

    return {
      id,
      title: cleanTitle,
      artist: customArtist,
      description: customDescription,
      coverImage: image.startsWith("http") ? `url(${image})` : image,
      links, // Pasamos el objeto de links completo al frontend
      tags
    };

  } catch (error) {
    console.error(`Error procesando ${primaryUrl}:`, error);
    return {
      id, title: "Proyecto Offline", artist: customArtist, description: customDescription,
      coverImage: "#333333", links, tags: ["Error"]
    };
  }
}