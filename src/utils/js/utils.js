import moment from 'moment'
import CryptoJS from "crypto-js"
import BigNumber from "bignumber.js"
import Iban from '../../../static/web3-eth-iban/src/index'
export default {
  install(Vue, opt) {
    Vue.prototype.tableHeaderColor = function ({row, column, rowIndex, columnIndex}) {
      if (rowIndex === 0) {
        return 'background-color:#ffffff ;color: #333;font-weight: 600;font-size: 15px;height:58px;'
      }
    }
    /*时间戳转换=>moment*/
    Vue.prototype.timestampToTime = function (timestamp) {
      // console.log('555')
      let time = ''
      if (timestamp == '' || timestamp == null || timestamp == undefined) {
        time = ''
      } else {
        time = moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')
      }
      return time
    }
    /*时间戳转换=>无时分秒*/
    Vue.prototype.timestampToTime_1 = function (timestamp) {
      // console.log('555')
      let time = ''
      if (timestamp == '' || timestamp == null || timestamp == undefined) {
        time = ''
      } else {
        time = moment(timestamp * 1000).format('YYYY-MM-DD')
      }
      return time
    }
    Vue.prototype.passwordEncryption = function (e) {
      let cipherText = CryptoJS.HmacSHA1(e, '87krsC!IPF@OBRPEOh#Uat9C').toString(CryptoJS.enc.Hex);
      return cipherText;
      // Decrypt 解密
      // let bytes = CryptoJS.AES.decrypt(cipherText, "87krsC!IPF@OBRPEOh#Uat9C");
      // let originalText = bytes.toString(CryptoJS.enc.Utf8);
      // console.log(originalText);
    }
    /*金额转换*/
    Vue.prototype.scientificCounting = function (e) {
      let num = 0
      if (e == 0 || e == '' || e == null || e == undefined|| e == NaN) {
        num = 0
      } else {
        num =new BigNumber(`${e}`).div("1e+18").toString(10);
        // if(num.indexOf('.') !== -1 && num.split('.')[1].length > 6){
        //   num = parseFloat(num).toFixed(6)
        // }
      }
      return num
    }
    /*16进制转32进制*/
    Vue.prototype.to_32_decimal = function (e) {
      let ban =Iban.toIban(e);
      return ban
    }
    /*32进制转16进制*/
    Vue.prototype.to_16_decimal = function (e) {
      let ban =Iban.toAddress(e);
      return ban
    }
  }

}
