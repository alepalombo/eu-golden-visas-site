import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Top European Golden Visas, Compared — Free Live Webinar';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  return res.arrayBuffer();
}

const LOGO_URL = 'https://www.eu-golden-visas.alepalombo.com/bitizenship-logo-white.png';

export default async function Image() {
  const [interRegular, interSemibold, loraRegular, loraItalic] = await Promise.all([
    loadFont('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf'),
    loadFont('https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf'),
    loadFont('https://fonts.gstatic.com/s/lora/v37/0QI8MX1D_JOuMw_hLdO6T2wV9KnW-MoFkqg.ttf'),
    loadFont('https://fonts.gstatic.com/s/lora/v37/0QI6MX1D_JOuGQbT0gvTJPa787weuyJG.ttf'),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '70px 80px',
          background:
            'linear-gradient(135deg, #0F1A2E 0%, #14233F 60%, #1A2D52 100%)',
          color: '#FFFFFF',
          fontFamily: 'Inter',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 18,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#5BA4F5',
            fontWeight: 600,
          }}
        >
          <div style={{ width: 40, height: 2, background: '#5BA4F5' }} />
          Free Live Webinar · June 10, 2026
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.05,
              letterSpacing: -2,
              fontFamily: 'Lora',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Top European</span>
            <span style={{ display: 'flex', gap: 22 }}>
              <span>Golden Visas,</span>
              <span style={{ fontStyle: 'italic', fontFamily: 'Lora' }}>Compared.</span>
            </span>
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: '#94A3B8',
              fontWeight: 400,
              maxWidth: 980,
            }}
          >
            Italy · Greece · Portugal · Hungary · Malta · Cyprus. The five EU programs left, honestly compared.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div style={{ fontSize: 22, color: '#FFFFFF', fontWeight: 600 }}>
              Alessandro Palombo
            </div>
            <div style={{ fontSize: 16, color: '#6B7B95' }}>
              Independent jurisdictional intelligence · No placement fees
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 8,
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#6B7B95',
                fontWeight: 600,
              }}
            >
              Sponsored by
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_URL} alt="Bitizenship" height={28} style={{ height: 28 }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Lora', data: loraRegular, weight: 400, style: 'normal' },
        { name: 'Lora', data: loraItalic, weight: 400, style: 'italic' },
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interSemibold, weight: 600, style: 'normal' },
      ],
    }
  );
}
