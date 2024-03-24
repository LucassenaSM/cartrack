import styles from './conteiner.css'


function Conteiner(props){

    return <div className={styles.conteiner}>{props.children}</div>
}

export default Conteiner