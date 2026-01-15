import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(
  ({ highlight, className, ...props }, ref) => {
    const id = useId();
    const clipId = `${id}-monogram-clip`;

    return (
      <svg
        aria-hidden
        className={classes(styles.monogram, className)}
        width="150"
        height="32"
        viewBox="0 0 150 32"
        ref={ref}
        {...props}
      >
        <defs>
          <clipPath id={clipId}>
            <text
              x="30"
              y="24"
              fontSize="24"
              fontWeight="800"
              fontFamily="Inter, Poppins, Montserrat, Arial Black, sans-serif"
              letterSpacing="-0.04em"
            >
              OlgaCodes
            </text>
          </clipPath>
        </defs>

        {/* Base fill */}
        <rect
          clipPath={`url(#${clipId})`}
          width="100%"
          height="100%"
        />

        {/* Hover highlight */}
        {highlight && (
          <g clipPath={`url(#${clipId})`}>
            <rect
              className={styles.highlight}
              width="100%"
              height="100%"
            />
          </g>
        )}
      </svg>
    );
  }
);
