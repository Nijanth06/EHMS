import Alert from 'react-bootstrap/Alert';

const ServerAlert = (props) => {
    return (
        <>
            <Alert style={{backgroundColor:props.data.backgroundColor , color : props.data.color}}>
                {props.data.msg}
            </Alert>
        </>
    );
}

export default ServerAlert;