import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '../components/Header';
import { Link, routing } from '../../../i18n/routing';
import { SITE_URL } from '../../../lib/site';

/*
 * Mentions légales + politique de confidentialité.
 *
 * Written in French on purpose: it is the operative language for a business
 * established in France, and the wording is the part that carries legal
 * weight.
 *
 * Company details supplied by Elan Créateur. The SIRET passes its Luhn check
 * and the VAT number embeds the matching SIREN, so the figures are internally
 * consistent.
 *
 * This is a starting template, not legal advice. Have Elan Créateur or a
 * lawyer review it before relying on it.
 */

export async function generateMetadata({ params }) {
  const { local } = await params;
  const t = await getTranslations({ locale: local, namespace: 'Legal' });

  const title = `${t('nav')} | Westfrench Academy`;
  const url = `${SITE_URL}/${local}/mentions-legales`;

  return {
    title,
    description: t('metaDescription'),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((locale) => [
            locale,
            `${SITE_URL}/${locale}/mentions-legales`,
          ])
        ),
        'x-default': `${SITE_URL}/${routing.defaultLocale}/mentions-legales`,
      },
    },
  };
}

const Section = ({ title, children }) => (
  <section className="mt-8">
    <h2 className="text-2xl font-semibold text-brand">{title}</h2>
    <div className="mt-3 space-y-3 text-ink-800 text-sm leading-relaxed">
      {children}
    </div>
  </section>
);

export default async function LegalPage({ params }) {
  const { local } = await params;

  // Static rendering — see layout.js.
  setRequestLocale(local);
  const t = await getTranslations({ locale: local, namespace: 'Legal' });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="top-0 left-0 right-0 z-50 bg-surface shadow-md">
        <Header />
      </div>

      <main id="main-content" tabIndex={-1} className="flex-1 p-8 pb-20 sm:p-20">
        {/* Clears the fixed banner + header with room to breathe. At
            sm:pt-16 the heading actually slipped behind the header on
            desktop, where the fixed chrome is ~152px tall. */}
        <article className="max-w-3xl mx-auto pt-32 sm:pt-28">
          <h1 className="text-4xl font-bold text-rust-lg">
            Mentions légales &amp; politique de confidentialité
          </h1>

          <div className="mt-8 bg-cream p-8 rounded-3xl shadow-lg">
            <Section title="Éditeur du site">
              <p>
                Le site westfrench-academy.com est édité par Marion Richard,
                professeure de français langue étrangère, exerçant sous
                l’enseigne <strong>Westfrench Academy</strong>.
              </p>
              <p>
                Activité portée par la coopérative d’activités et d’emploi{' '}
                <strong>Elan Créateur</strong>, 7 rue Armand Herpin Lacroix – CS
                73902, 35039 RENNES CEDEX.
              </p>
              <p>
                Forme juridique : Autre SA coopérative à conseil
                d’administration — Capital social : 4 000,00 €.
              </p>
              <p>
                Numéro SIRET : 43782795900010 — Numéro de TVA
                intracommunautaire : FR02437827959.
              </p>
              <p>Responsable de la publication : Marion Richard.</p>
              <p>
                Contact : 07 84 58 23 09 —{' '}
                <a
                  href="mailto:marion.westfrench@gmail.com"
                  className="text-brand hover:text-rust underline"
                >
                  marion.westfrench@gmail.com
                </a>
              </p>
              <p>
                Lieu des cours en présentiel : La Maison des associations, 6
                cours des Alliés, 35000 Rennes.
              </p>
            </Section>

            <Section title="Conception et réalisation du site">
              <p>
                Ce site a été conçu et développé par{' '}
                <strong>Alberto Ramos</strong> —{' '}
                <a
                  href="mailto:albertramos902@gmail.com"
                  className="text-brand hover:text-rust underline"
                >
                  albertramos902@gmail.com
                </a>
                .
              </p>
            </Section>

            <Section title="Hébergement">
              <p>
                Le site est hébergé par <strong>Netlify, Inc.</strong>, 101 2nd
                Street, San Francisco, CA 94105, États-Unis.
              </p>
              <p>
                Netlify ne publie pas de numéro de téléphone de contact ; la
                société est joignable via{' '}
                <a
                  href="https://www.netlify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-rust underline"
                >
                  netlify.com
                </a>
                .
              </p>
              <p>
                L’hébergement étant situé aux États-Unis, les données transmises
                par le formulaire de contact peuvent être transférées hors de
                l’Union européenne, dans le cadre des garanties contractuelles
                mises en place par Netlify.
              </p>
            </Section>

            <Section title="Propriété intellectuelle">
              <p>
                L’ensemble des contenus de ce site (textes, photographies, logo,
                supports pédagogiques) est protégé par le droit d’auteur. Toute
                reproduction ou réutilisation, totale ou partielle, sans
                autorisation écrite préalable est interdite.
              </p>
            </Section>

            <Section title="Avis et témoignages">
              <p>
                Les témoignages affichés sur ce site proviennent des avis
                publiés par leurs auteurs sur la fiche Google Business Profile
                de Westfrench Academy, ainsi que de retours transmis
                directement à l’enseignante.
              </p>
              <p>
                Aucun avis n’est rédigé par l’éditeur du site. Le contenu des
                avis n’est pas modifié dans son sens ; seules des corrections
                mineures de ponctuation ou de mise en forme peuvent être
                apportées.
              </p>
              <p>
                <strong>Traduction :</strong> les versions française, anglaise
                et espagnole du site présentent ces témoignages traduits. La
                traduction vise à rester fidèle au propos de l’auteur, mais il
                ne s’agit pas de ses mots exacts. Les avis d’origine restent
                consultables publiquement sur la fiche Google de
                l’établissement.
              </p>
              <p>
                Les témoignages présentés ici sont une sélection d’avis publiés
                sur la fiche Google de l’établissement. Aucun avis n’a été
                écarté au motif qu’il serait défavorable, et l’intégralité des
                avis reçus, quelle que soit la note, reste consultable
                publiquement sur cette fiche.
              </p>
              <p>
                Toute personne citée peut demander à tout moment le retrait de
                son témoignage en écrivant à{' '}
                <a
                  href="mailto:marion.westfrench@gmail.com"
                  className="text-brand hover:text-rust underline"
                >
                  marion.westfrench@gmail.com
                </a>
                .
              </p>
            </Section>

            <Section title="Données personnelles collectées">
              <p>
                Le formulaire de contact du site collecte les données
                suivantes : <strong>nom</strong>, <strong>adresse e-mail</strong>,{' '}
                <strong>numéro de téléphone</strong> (facultatif),{' '}
                <strong>niveau de français</strong> (facultatif),{' '}
                <strong>objet</strong> (facultatif) et{' '}
                <strong>message</strong>.
              </p>
              <p>
                <strong>Finalité :</strong> répondre à votre demande
                d’information et, le cas échéant, organiser un cours d’essai ou
                une inscription. Ces données ne font l’objet d’aucune
                prospection commerciale automatisée et ne sont ni vendues ni
                cédées à des tiers.
              </p>
              <p>
                <strong>Base légale :</strong> votre consentement, donné en
                envoyant volontairement le formulaire.
              </p>
              <p>
                <strong>Destinataires :</strong> Marion Richard uniquement. Les
                messages sont transmis et stockés par le service Netlify Forms
                (Netlify, Inc.), qui agit comme sous-traitant technique.
              </p>
              <p>
                <strong>Durée de conservation :</strong> les messages reçus via
                le formulaire sont conservés 3 ans à compter du dernier contact,
                puis supprimés. Cette durée correspond à la recommandation de la
                CNIL pour les données de prospection et de gestion des demandes.
              </p>
            </Section>

            <Section title="Vos droits">
              <p>
                Conformément au Règlement général sur la protection des données
                (RGPD) et à la loi Informatique et Libertés, vous disposez d’un
                droit d’accès, de rectification, d’effacement, de limitation,
                d’opposition et de portabilité sur vos données.
              </p>
              <p>
                Pour exercer ces droits, écrivez à{' '}
                <a
                  href="mailto:marion.westfrench@gmail.com"
                  className="text-brand hover:text-rust underline"
                >
                  marion.westfrench@gmail.com
                </a>
                . Vous pouvez également introduire une réclamation auprès de la
                CNIL (
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-rust underline"
                >
                  www.cnil.fr
                </a>
                ).
              </p>
            </Section>

            <Section title="Cookies et services tiers">
              <p>
                Ce site n’utilise aucun cookie publicitaire, ni outil de mesure
                d’audience, ni traceur déposé par nous-mêmes.
              </p>
              <p>
                La galerie Instagram affichée en bas de page est fournie par le
                service tiers <strong>LightWidget</strong>. Elle est chargée
                depuis les serveurs de LightWidget et son affichage entraîne, du
                fait de ce prestataire, la collecte des informations suivantes :
                adresse IP de l’appareil, informations de connexion (type et
                version du navigateur, système d’exploitation, plateforme
                mobile, identifiant unique d’appareil), date, heure et page de
                provenance, ainsi que le nombre de vues et de clics sur le
                widget.
              </p>
              <p>
                LightWidget dispose de sa propre politique de cookies et fait
                appel à ses propres sous-traitants, notamment Hetzner Online
                (hébergement), Amazon Web Services (sauvegardes) et Cloudflare
                (diffusion de contenu). Pour en savoir plus, consultez la{' '}
                <a
                  href="https://lightwidget.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-rust underline"
                >
                  politique de confidentialité de LightWidget
                </a>
                .
              </p>
              <p className="text-ink-600">
                Pour limiter cette collecte, la galerie est chargée uniquement
                lorsque vous faites défiler la page jusqu’à elle : si vous ne
                descendez pas jusqu’au bas du site, aucune requête n’est
                envoyée à LightWidget. La galerie n’est pas nécessaire à la
                consultation du site.
              </p>
            </Section>

            {/* Hardcoded on purpose: a generated date would always read
                "updated today", which would be untrue. Bump it by hand
                whenever this page actually changes. */}
            <p className="mt-10 text-xs text-ink-500">
              Dernière mise à jour : 21 août 2026
            </p>
          </div>

          <div className="flex justify-center mt-12">
            <Link
              href="/"
              className="border-2 border-ember text-rust px-6 py-3 rounded-lg font-semibold hover:bg-ember hover:text-white transition duration-300"
            >
              ← {t('backToSite')}
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
