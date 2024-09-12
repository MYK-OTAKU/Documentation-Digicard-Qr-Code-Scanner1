import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// Liste des fonctionnalités avec GIFs et descriptions pour DigiCard
const FeatureList = [
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

function Feature({ Gif, title, description, idx }) {
  // Ajoute une classe spéciale pour le premier et le dernier élément
  const isFirst = idx === 0;
  const isLast = idx === FeatureList.length - 1;
  const imageClass = clsx(
    styles.featureGif, // Classe par défaut pour toutes les images
    { [styles.specialImage]: isFirst || isLast } // Classe spéciale pour le premier et le dernier
  );

  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={Gif} className={imageClass} role="img" alt={title} />
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
        <div className="row imagess">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} idx={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
