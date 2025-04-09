import React from "react";

const Dummy = () => {
  return (
    <div className={styles.container}>
        <h1>Sorry for the inconvenience</h1>
        <p>We will update this shortly. Thank you for visiting.</p>
        <p>Try to explore other sections of our site.</p>
        <Link href="/">
          <button className={styles.homeButton}>Go Back Home</button>
        </Link>
      </div>
  );
};

export default Dummy;
