
interface Props {
    message: string
}

const InvalidInput = (props: Props) => {
  return (
    <div style={styles.invalidInput}>{props.message}</div>
  )
}

const styles = {
    invalidInput: {
        width: '100%',
        marginTop: '0.25rem',
        fontSize: '0.875em',
        color: '#dc3545'
    } as React.CSSProperties
}

export default InvalidInput;