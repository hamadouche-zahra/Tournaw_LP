import Marquee from 'react-fast-marquee';
import { useLanguage } from '../i18n/LanguageContext';

export const SportsMarquee = () => {
  const { t, isRTL } = useLanguage();

  const sports = [
    { name: t('sports.volleyball'), image: '/sports/volleyball.jpeg' },
    { name: t('sports.beachVolleyball'), image: '/sports/beach-volleyball.jpeg' },
    { name: t('sports.pickleball'), image: '/sports/pickleball.jpeg' },
    { name: t('sports.tennis'), image: '/sports/tennis.jpeg' },
    { name: t('sports.padel'), image: '/sports/padel.jpeg' },
    { name: t('sports.basketball'), image: '/sports/basketball.jpeg' },
    { name: t('sports.tableTennis'), image: '/sports/table-tennis.jpeg' },
    { name: t('sports.badminton'), image: '/sports/badminton.jpeg' },
    { name: t('sports.footVolleyball'), image: '/sports/foot-volleyball.jpeg' },
    { name: t('sports.crossfit'), image: '/sports/crossfit.jpeg' },
    { name: t('sports.football'), image: '/sports/football.jpeg' },
    { name: t('sports.chess'), image: '/sports/chess.jpeg' },
    { name: t('sports.netball'), image: '/sports/netball.jpeg' },
    { name: t('sports.esports'), image: '/sports/esports.jpeg' },
    { name: t('sports.teqball'), image: '/sports/teqball.jpeg' },
  ];

  return (
    <section
      data-testid="sports-marquee"
      className="py-12 md:py-16 border-y border-border overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 md:px-12 mb-8">
        <p className="text-center text-sm uppercase tracking-[0.2em] font-bold text-primary" data-testid="sports-marquee-title">
          {t('sports.title')}
        </p>
      </div>
      <Marquee speed={35} gradient={false} pauseOnHover direction={isRTL ? 'right' : 'left'}>
        <div className="flex items-center gap-16 px-8">
          {[...sports, ...sports].map((sport, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 min-w-[120px]"
              data-testid={`sport-item-${index}`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full border border-primary/20 p-3 overflow-hidden" style={{ backgroundColor: '#13718f' }}>
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-full object-contain"
                  style={{ mixBlendMode: 'screen' }}
                />
              </div>
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                {sport.name}
              </span>
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
};
