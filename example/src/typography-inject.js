import React from 'react';
import { Helmet } from 'react-helmet';
import Typography from 'typography'
import twinPeaks from 'typography-theme-twin-peaks'
const typography = new Typography(twinPeaks)

export const Head = props => {
  const { children, ...rest } = props;
  // Create family + styles string
  let fontsStr = '';
  if (typography.options.googleFonts) {
    const fonts = typography.options.googleFonts.map(font => {
      let str = '';
      str += font.name.split(' ').join('+');
      str += ':';
      str += font.styles.join(',');

      return str;
    });

    fontsStr = fonts.join('|');
  }

  return (
    <Helmet {...rest}>
      {fontsStr !== '' && (
        <link
          href={`//fonts.googleapis.com/css?family=${fontsStr}`}
          rel="stylesheet"
          type="text/css"
        />
      )}
      <style>{`${typography.createStyles()}`}</style>
      {children}
    </Helmet>
  );
};