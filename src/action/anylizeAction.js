"use server";
export async function anylizeAction(prevState, formData) {
  const imageDataUrl = String(formData.get("image") || "");
  const rid = String(formData.get("rid") || "");

  if (!imageDataUrl) {
    return {
      ok: false,
      html: "<p>Tidak ada foto. Tolong foto terlebih dahulu pada kamera kalian.!</p>",
    };
  }

  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  if (!OPENROUTER_API_KEY) {
    return {
      ok: false,
      html: "<p>Harap Tambahkan API KEY nya dulu</p>",
    };
  }

  const model = "mistralai/mistral-small-3.2-24b-instruct:free";

  const instruction = `
      Keluarkan HASIL dalam HTML valid (tanpa <style> eksternal).  
Gunakan margin dan padding inline agar tampilan lebih rapi.  
Topik: analisis MBTI dari wajah/pose (hiburan).  
Nada tegas & ringkas.  
Jangan minta data lahir.  
Ini murni hiburan, bukan diagnosis psikologi profesional.

Jika TIDAK ada manusia: balas persis:
<p style="margin:20px; padding:12px; border:1px solid #4b5563; border-radius:10px; text-align:center; background:#030712; color:#f9fafb;">Tidak terdeteksi orang. Tolong Anda berada dalam kamera dan ambil foto lagi.</p>

Jika ADA manusia, hasilkan struktur HTML berikut dengan jarak dan pemisah yang rapi:

<div style="background:#030712; color:#f9fafb; min-height:100vh; padding:20px;">

<section style="margin:20px; padding:16px; border:1px solid #374151; border-radius:10px; background:#0c1017;">
  <h2 style="margin-bottom:8px; color:#f9fafb;">🔍 Observasi Visual</h2>
  <ul style="margin-left:20px; line-height:1.6; color:#e5e7eb;">
    <li>Ekspresi wajah (rileks/serius/ceria/fokus)</li>
    <li>Bahasa tubuh & postur (terbuka/tertutup/percaya diri/santai)</li>
    <li>Kontak mata & arah pandang (langsung/menyamping/ke bawah)</li>
    <li>Gaya berpakaian & grooming (rapi/kasual/kreatif/formal)</li>
    <li>Energi keseluruhan (introvert/ekstrovert/tenang/dinamis)</li>
  </ul>
</section>

<section style="margin:20px; padding:16px; border:1px solid #1e3a8a; border-radius:10px; background:#0f172a;">
  <h2 style="margin-bottom:8px; color:#f9fafb;">🎯 Prediksi Tipe MBTI</h2>
  <div style="background:#1e293b; padding:12px; border-left:4px solid #3b82f6; margin-bottom:12px;">
    <h3 style="margin:0 0 8px 0; color:#60a5fa;">Tipe Utama: [XXXX]</h3>
    <p style="margin:4px 0; color:#e5e7eb;"><strong>Kepercayaan:</strong> [Tinggi/Sedang/Kemungkinan]</p>
  </div>
  
  <article style="margin-bottom:16px;">
    <h3 style="color:#d1d5db;">📊 Breakdown Fungsi Kognitif</h3>
    <ul style="margin-left:20px; line-height:1.8; color:#e5e7eb;">
      <li><strong>Fungsi Dominan:</strong> [Ne/Ni/Se/Si/Te/Ti/Fe/Fi] - penjelasan singkat dari visual</li>
      <li><strong>Fungsi Auxiliary:</strong> [Fungsi] - penjelasan singkat</li>
      <li><strong>Fungsi Tertiary:</strong> [Fungsi] - indikasi dari pose/ekspresi</li>
      <li><strong>Fungsi Inferior:</strong> [Fungsi] - kemungkinan area tersembunyi</li>
    </ul>
  </article>

  <article style="margin-bottom:16px;">
    <h3 style="color:#d1d5db;">💡 Karakteristik Khas</h3>
    <ul style="margin-left:20px; line-height:1.8; color:#e5e7eb;">
      <li>Ciri kepribadian 1 (dengan bukti visual)</li>
      <li>Ciri kepribadian 2 (dengan bukti visual)</li>
      <li>Ciri kepribadian 3 (dengan bukti visual)</li>
      <li>Pola interaksi sosial yang terlihat</li>
    </ul>
  </article>

  <article style="margin-bottom:16px;">
    <h3 style="color:#d1d5db;">🎭 Dimensi MBTI</h3>
    <p style="line-height:1.6; color:#e5e7eb;">
      <strong style="color:#93c5fd;">E/I (Energi):</strong> [Extraversion/Introversion] - alasan berdasarkan bahasa tubuh<br>
      <strong style="color:#93c5fd;">S/N (Informasi):</strong> [Sensing/Intuition] - alasan berdasarkan fokus mata/ekspresi<br>
      <strong style="color:#93c5fd;">T/F (Keputusan):</strong> [Thinking/Feeling] - alasan berdasarkan ekspresi emosi<br>
      <strong style="color:#93c5fd;">J/P (Gaya Hidup):</strong> [Judging/Perceiving] - alasan berdasarkan kerapian/spontanitas
    </p>
  </article>
</section>

<section style="margin:20px; padding:16px; border:1px solid #374151; border-radius:10px; background:#0c1017;">
  <h2 style="margin-bottom:8px; color:#f9fafb;">🌟 Kekuatan & Area Pengembangan</h2>
  <article style="margin-bottom:12px;">
    <h3 style="color:#34d399;">✅ Kekuatan Natural</h3>
    <ul style="margin-left:20px; line-height:1.6; color:#e5e7eb;">
      <li>Kekuatan 1 sesuai tipe MBTI</li>
      <li>Kekuatan 2 sesuai tipe MBTI</li>
      <li>Kekuatan 3 sesuai tipe MBTI</li>
    </ul>
  </article>
  <article>
    <h3 style="color:#f87171;">🎯 Area untuk Dikembangkan</h3>
    <ul style="margin-left:20px; line-height:1.6; color:#e5e7eb;">
      <li>Area 1 (tantangan umum tipe ini)</li>
      <li>Area 2 (fungsi inferior yang perlu dilatih)</li>
      <li>Area 3 (blind spot potensial)</li>
    </ul>
  </article>
</section>

<section style="margin:20px; padding:16px; border:1px solid #374151; border-radius:10px; background:#0c1017;">
  <h2 style="margin-bottom:8px; color:#f9fafb;">💼 Karier & Relasi Cocok</h2>
  <article style="margin-bottom:12px;">
    <h3 style="color:#d1d5db;">Jalur Karier Ideal</h3>
    <p style="color:#e5e7eb;">3-4 bidang pekerjaan yang cocok dengan tipe MBTI ini (1-2 kalimat penjelasan)</p>
  </article>
  <article style="margin-bottom:12px;">
    <h3 style="color:#d1d5db;">Tipe MBTI Kompatibel</h3>
    <p style="color:#e5e7eb;"><strong style="color:#fbbf24;">Romantis:</strong> [Tipe 1], [Tipe 2] - alasan singkat</p>
    <p style="color:#e5e7eb;"><strong style="color:#fbbf24;">Persahabatan:</strong> [Tipe 1], [Tipe 2], [Tipe 3] - alasan singkat</p>
  </article>
  <article>
    <h3 style="color:#d1d5db;">Gaya Komunikasi</h3>
    <p style="color:#e5e7eb;">1-2 kalimat tentang bagaimana tipe ini berkomunikasi dan berinteraksi</p>
  </article>
</section>

<section style="margin:20px; padding:16px; border:1px solid #92400e; border-radius:10px; background:#1c1917;">
  <h2 style="margin-bottom:8px; color:#fbbf24;">⚠️ Disclaimer</h2>
  <p style="font-size:0.9em; color:#d1d5db; line-height:1.5;">
    Analisis ini berdasarkan interpretasi visual untuk hiburan semata. MBTI sejati membutuhkan tes psikometri valid dan tidak bisa ditentukan hanya dari foto. Gunakan hasil ini sebagai insight menarik, bukan keputusan final tentang kepribadian Anda.
  </p>
</section>

</div>
    `;

  const body = {
    model,
    messages: [
      {
        role: "system",
        content:
          "Anda asisten penganalisis foto dan profesi kamu adalah seorang profesional psikeater. Keluarkan HTML ringkas dan aman",
      },
      {
        role: "user",
        content: [
          { type: "text", text: instruction },
          { type: "image_url", image_url: { url: imageDataUrl } },
        ],
      },
    ],
    max_tokens: 900,
    temperature: 0.2,
  };

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "x-Title": "Kamera Ramalan Foto",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    const t = res.text();
    console.error("ERROR: ", res.status, t);
    return {
      ok: false,
      html: "<p>Gagal panggil AI nya</p>",
    };
  }

  const data = await res.json();

  const html = String(data?.choices?.[0]?.message?.content ?? "");
  return { ok: true, html, rid };
}
