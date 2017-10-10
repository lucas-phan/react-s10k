import global from '../components/global';
const sendOrder = ( strData) => {
    //const data = {  strData };
    //console.log(data);
    //const strData1 = `fullname=33&telephone=443&address=343&quanhuyen=34234`;
    // const data = {  strData1 };
    // console.log(strData1);


    return fetch(`${global.homeLink}api/dathang`,
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(strData)

    })
    .then(res => res.text())
};

module.exports = sendOrder;
