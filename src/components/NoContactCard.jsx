import styles from "./NoContactCard.module.css";
import ContactLogo from "../assets/images/Hands Contact.png";

const NoContactCard = () => {
  return (
    <div className={styles.container}>
        <div className={styles.card}>
      <img src={ContactLogo} alt="Contact" />
      <h3>No Contact Found</h3>
      </div>
    </div>
  );
};

export default NoContactCard;
