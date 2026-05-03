import React from 'react';

const SnowflakeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    <line x1="12" y1="2" x2="9" y2="5" /><line x1="12" y1="2" x2="15" y2="5" />
    <line x1="12" y1="22" x2="9" y2="19" /><line x1="12" y1="22" x2="15" y2="19" />
    <line x1="2" y1="12" x2="5" y2="9" /><line x1="2" y1="12" x2="5" y2="15" />
    <line x1="22" y1="12" x2="19" y2="9" /><line x1="22" y1="12" x2="19" y2="15" />
  </svg>
);

const DropletsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
  </svg>
);

const LeafIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

export default function WhyFreezeDryingSection() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600;700&display=swap"
      />
      <style>{`
        .tdf-section {
          position: relative;
          background: #080808;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-family: 'Inter', sans-serif;
          color: #fff;
        }

        .tdf-content {
          position: relative;
          z-index: 1;
          max-width: 1440px;
          margin: 0 auto;
          padding: 64px 40px 56px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
          gap: 32px 44px;
          align-items: stretch;
          box-sizing: border-box;
        }

        .tdf-col-left,
        .tdf-col-right {
          display: flex;
          flex-direction: column;
          min-width: 0;
          min-height: 100%;
        }

        .tdf-col-right {
          align-items: flex-end;
        }

        .tdf-badge {
          display: inline-block;
          padding: 5px 16px;
          border: 1px solid rgba(212,175,55,0.35);
          background: rgba(18,15,9,0.95);
          color: #D4AF37;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          border-radius: 100px;
          margin-bottom: 22px;
        }
        .tdf-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(30px, 3.4vw, 52px);
          font-weight: 700;
          line-height: 1.08;
          margin: 0 0 22px;
          color: #fff;
        }
        .tdf-heading .gold { color: #D4AF37; display: block; }
        .tdf-desc {
          font-size: 14px;
          line-height: 1.85;
          color: rgba(255,255,255,0.58);
          max-width: 380px;
          margin: 0;
        }

        .tdf-fruit {
          position: relative;
          margin-top: auto;
          width: 100%;
          max-width: min(100%, 400px);
          padding-top: 28px;
        }
        .tdf-col-right .tdf-fruit {
          margin-top: auto;
          align-self: flex-end;
        }
        .tdf-fruit img {
          width: 100%;
          height: auto;
          max-height: min(340px, 42vw);
          object-fit: contain;
          object-position: bottom center;
          display: block;
        }
        .tdf-fruit-label {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          padding: 6px 20px;
          border: 1px solid rgba(212,175,55,0.45);
          background: rgba(0,0,0,0.88);
          color: #D4AF37;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          border-radius: 100px;
          white-space: nowrap;
        }

        .tdf-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 220px;
          padding-top: 8px;
        }

        .tdf-logo {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          border: 1.5px solid rgba(212,175,55,0.85);
          background: #080808;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-shrink: 0;
        }
        .tdf-logo-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: -6px;
        }
        .tdf-logo-wordmark {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 700;
          color: #D4AF37;
          line-height: 1;
          letter-spacing: 2px;
        }

        .tdf-timeline {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        .tdf-vline {
          width: 1px;
          background: linear-gradient(to bottom, #D4AF37, rgba(212,175,55,0.25));
          flex-shrink: 0;
        }
        .tdf-arrow {
          width: 7px;
          height: 7px;
          border-right: 1.5px solid rgba(212,175,55,0.75);
          border-bottom: 1.5px solid rgba(212,175,55,0.75);
          transform: rotate(45deg);
          margin: -4px 0;
          flex-shrink: 0;
        }
        .tdf-step {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          width: 100%;
        }
        .tdf-step-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(212,175,55,0.65);
          background: #080808;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .tdf-step-title {
          color: #D4AF37;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .tdf-step-desc {
          color: rgba(255,255,255,0.58);
          font-size: 12.5px;
          line-height: 1.65;
          margin: 0;
          max-width: 190px;
        }

        .tdf-mobile-fruits { display: none; }

        @media (max-width: 1100px) {
          .tdf-content {
            padding: 52px 28px 44px;
            gap: 28px 28px;
          }
          .tdf-fruit img {
            max-height: min(280px, 48vw);
          }
        }

        @media (max-width: 900px) {
          .tdf-content {
            grid-template-columns: 1fr;
            gap: 40px 0;
            padding: 48px 24px 40px;
          }
          .tdf-col-right,
          .tdf-fruit.tdf-fruit--desktop {
            display: none;
          }
          .tdf-center {
            order: 0;
            min-width: unset;
            width: 100%;
            max-width: 360px;
            margin: 0 auto;
          }
          .tdf-col-left {
            order: -1;
          }
          .tdf-desc { max-width: 100%; }
          .tdf-mobile-fruits {
            display: flex;
            flex-direction: column;
            gap: 16px;
            order: 1;
          }
          .tdf-mobile-fruit-wrap {
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            background: #0d0d0d;
          }
          .tdf-mobile-fruit-wrap img {
            width: 100%;
            height: 240px;
            object-fit: contain;
            object-position: center bottom;
            display: block;
            background: #080808;
          }
          .tdf-mobile-label {
            position: absolute;
            bottom: 14px;
            left: 50%;
            transform: translateX(-50%);
            padding: 6px 20px;
            border: 1px solid rgba(212,175,55,0.35);
            background: rgba(0,0,0,0.9);
            color: #D4AF37;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            border-radius: 100px;
            white-space: nowrap;
          }
        }
      `}</style>

      <section className="tdf-section">
        <div className="tdf-content">
          <div className="tdf-col-left">
            <div>
              <span className="tdf-badge">Why Freeze Drying?</span>
              <h2 className="tdf-heading">
                The Science of
                <span className="gold">Keeping Fruit</span>
                <span className="gold">Perfect</span>
              </h2>
              <p className="tdf-desc">
                Freeze drying is the gold standard of food preservation. By removing moisture
                at sub-zero temperatures, we lock in the color, flavor, and nutrition of fruit
                at its absolute peak without a single additive.
              </p>
            </div>
            <div className="tdf-fruit tdf-fruit--desktop">
              <img
                src="/fresh_fruit_black_bg.png"
                alt="Bowl of fresh strawberries, blueberries, mango, apple, and banana"
              />
              <span className="tdf-fruit-label">Fresh Fruit</span>
            </div>
          </div>

          <div className="tdf-center">
            <div className="tdf-logo">
              <div className="tdf-logo-inner">
                <LeafIcon size={22} />
                <span className="tdf-logo-wordmark">TDF</span>
              </div>
              <svg
                viewBox="0 0 130 130"
                aria-hidden="true"
                style={{ position: 'absolute', inset: 0, width: '130px', height: '130px', pointerEvents: 'none' }}
              >
                <path id="tdf-arc" d="M 14 70 A 50 50 0 0 0 116 70" fill="transparent" />
                <text fontSize="7.5" fill="#D4AF37" fontWeight="700" letterSpacing="3.5" fontFamily="Inter, sans-serif">
                  <textPath href="#tdf-arc" startOffset="50%" textAnchor="middle">
                    THE DRY FACTORY
                  </textPath>
                </text>
              </svg>
            </div>

            <div className="tdf-timeline">
              <div className="tdf-vline" style={{ height: '36px' }} />
              <div className="tdf-arrow" />
              <div style={{ height: '18px' }} />
              <div className="tdf-step">
                <div className="tdf-step-icon"><SnowflakeIcon /></div>
                <div style={{ paddingTop: '6px' }}>
                  <div className="tdf-step-title">Freeze</div>
                  <p className="tdf-step-desc">Fruits are frozen at sub-zero temperatures to lock in nutrition and freshness.</p>
                </div>
              </div>
              <div style={{ height: '20px' }} />
              <div className="tdf-vline" style={{ height: '40px' }} />
              <div className="tdf-arrow" />
              <div style={{ height: '18px' }} />
              <div className="tdf-step">
                <div className="tdf-step-icon"><DropletsIcon /></div>
                <div style={{ paddingTop: '6px' }}>
                  <div className="tdf-step-title">Dry</div>
                  <p className="tdf-step-desc">Moisture is removed through sublimation, leaving the fruit intact, not cooked.</p>
                </div>
              </div>
              <div style={{ height: '20px' }} />
              <div className="tdf-vline" style={{ height: '40px' }} />
              <div className="tdf-arrow" />
              <div style={{ height: '18px' }} />
              <div className="tdf-step">
                <div className="tdf-step-icon"><LeafIcon /></div>
                <div style={{ paddingTop: '6px' }}>
                  <div className="tdf-step-title">Preserve</div>
                  <p className="tdf-step-desc">The result is real fruit, with real nutrition, real flavor, and a long shelf life.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="tdf-col-right">
            <div className="tdf-fruit tdf-fruit--desktop">
              <img
                src="/freeze_dried_black_bg.png"
                alt="Bowl of freeze-dried fruit pieces"
              />
              <span className="tdf-fruit-label">Freeze-Dried Fruit</span>
            </div>
          </div>

          <div className="tdf-mobile-fruits">
            <div className="tdf-mobile-fruit-wrap">
              <img src="/fresh_fruit_black_bg.png" alt="Fresh fruit bowl" />
              <span className="tdf-mobile-label">Fresh Fruit</span>
            </div>
            <div className="tdf-mobile-fruit-wrap">
              <img src="/freeze_dried_black_bg.png" alt="Freeze-dried fruit bowl" />
              <span className="tdf-mobile-label">Freeze-Dried Fruit</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
