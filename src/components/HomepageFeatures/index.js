import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// List of features with updated GIFs and descriptions for DigiCard
const FeatureList = [
  {
    title: 'Facile à Utiliser',
    Gif: require('@site/static/img/mm.gif').default,
    description: (
      <>
        DigiCard est conçu pour rendre le scan de QR codes intuitif et rapide,
        avec une interface simple et des fonctionnalités puissantes.
      </>
    ),
  },
  {
    title: 'Analyse de Sécurité Intégrée',
    Gif: require('@site/static/img/se.jpeg').default,
    description: (
      <>
        Scannez vos QR codes en toute sécurité. DigiCard utilise l'API VirusTotal
        pour analyser les liens et garantir votre protection.
      </>
    ),
  },
  {
    title: 'Multiplateforme et Multilingue',
    Gif: require('@site/static/img/pp.jpeg').default,
    description: (
      <>
        DigiCard est disponible sur plusieurs plateformes et supporte différentes
        langues pour une utilisation globale.
      </>
    ),
  },
];

function Feature({Gif, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* Utilisation du GIF au lieu du SVG */}
        <img src={Gif} className={styles.featureGif} role="img" alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
