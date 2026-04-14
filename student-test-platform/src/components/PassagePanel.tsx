import styles from './PassagePanel.module.css';

export default function PassagePanel() {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelLabel}>Passage</span>
        <span className={styles.passageTitle}>The Role of Microorganisms in Soil Ecosystems</span>
      </div>

      <div className={styles.content}>
        <p className={styles.paragraph}>
          Beneath the surface of every meadow, forest, and farm lies a hidden world teeming with life.
          The soil microbiome — an intricate community of bacteria, fungi, archaea, and protozoa —
          performs functions so essential to terrestrial ecosystems that without it, most plant life
          on Earth would cease to exist within years. Yet for most of human history, this world remained
          entirely invisible, its complexity unsuspected.
        </p>

        <p className={styles.paragraph}>
          Scientists now estimate that a single teaspoon of healthy agricultural soil contains more
          microorganisms than there are people on Earth. This staggering density of life is not merely
          incidental — it is functional. Bacteria and fungi break down organic matter, releasing nutrients
          that plants cannot obtain directly from rock and mineral particles. Nitrogen-fixing bacteria
          convert atmospheric nitrogen into forms that plants can absorb through their roots. Mycorrhizal
          fungi extend the effective reach of plant root systems by orders of magnitude, essentially
          acting as a secondary root network that can span entire forests.
        </p>

        <div className={styles.callout}>
          <span className={styles.calloutLabel}>Key Concept</span>
          <p className={styles.calloutText}>
            Mycorrhizal networks — sometimes called the "Wood Wide Web" — allow trees to share
            nutrients and even chemical warning signals across vast distances underground.
          </p>
        </div>

        <p className={styles.paragraph}>
          The relationship between plants and soil microbes is not merely one of passive nutrient
          exchange. Research published in the journal <em>Nature Ecology &amp; Evolution</em> revealed
          that plants actively recruit specific microbial communities by secreting particular sugars
          and amino acids through their roots — a process known as rhizosphere priming. Different plant
          species cultivate dramatically different microbial neighborhoods, a phenomenon that helps
          explain why soil fertility can vary so dramatically across distances of only a few meters.
        </p>

        <p className={styles.paragraph}>
          Human agricultural practices have disrupted these ancient relationships in ways scientists
          are only beginning to understand. The widespread use of synthetic fertilizers, which supply
          nitrogen and phosphorus directly, reduces plants' reliance on microbial partners and can
          cause the populations of beneficial bacteria and fungi to decline precipitously over time.
          Tilling, while effective at controlling weeds and aerating soil, physically disrupts the
          fungal networks that take years to establish. Pesticides designed to eliminate harmful
          organisms often have collateral effects on beneficial microbes.
        </p>

        <p className={styles.paragraph}>
          A growing movement toward regenerative agriculture seeks to reverse these trends by
          minimizing soil disturbance, maintaining continuous plant cover, and eliminating synthetic
          inputs wherever possible. Early results from long-term comparative studies suggest that
          regeneratively managed soils exhibit higher microbial diversity, greater carbon sequestration
          capacity, and improved water retention compared to conventionally managed plots — even when
          conventional plots receive higher inputs of fertilizer.
        </p>

        <p className={styles.paragraph}>
          The implications extend beyond agriculture. Soil microbes play a significant role in the
          global carbon cycle, sequestering carbon in stable organic compounds and, under certain
          conditions, releasing it as carbon dioxide or methane. As climate change alters temperature
          and precipitation patterns worldwide, shifts in microbial community composition could
          create feedback loops that either accelerate or decelerate warming — a variable that current
          climate models struggle to incorporate with precision.
        </p>

        <p className={styles.paragraph}>
          Understanding and stewarding this microscopic world may prove to be one of the most
          consequential challenges of the coming century. The health of the soil beneath our feet
          is inseparable from the health of the ecosystems above it — and ultimately, from the
          health of human civilization itself.
        </p>
      </div>
    </div>
  );
}
