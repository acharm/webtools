package tools;

import java.math.BigDecimal;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;

public class MoneyUtil {
    public static void main(String[] args) {
        
    }
    
	/**
	 * 字符串金额：元转分(空值设0)
	 * @param yuanStr
	 * @return
	 */
	public static String yuanToFen(String yuanStr) {
 		String fenStr = "0";
 		if (StringUtils.isNotBlank(yuanStr)) {
 			fenStr = new BigDecimal(yuanStr).multiply(new BigDecimal(100)) + "";
 			if (fenStr.endsWith(".00")) {
 				fenStr = fenStr.substring(0, fenStr.indexOf("."));
 			}
 		}
 		return fenStr;
 	}

	/**
	 * 字符串金额：元转分(忽略空值)
	 * @param yuanStr
	 * @return
	 */
	public static String yuanToFenIgnoreBlank(String yuanStr) {
 		String fenStr = "";
 		if (StringUtils.isNotBlank(yuanStr)) {
 			fenStr = new BigDecimal(yuanStr).multiply(new BigDecimal(100)) + "";
 			if (fenStr.endsWith(".00")) {
 				fenStr = fenStr.substring(0, fenStr.indexOf("."));
 			}
 		}
 		return fenStr;
 	}
	
	/**
	 * 字符串金额：分金额相加
	 * 
	 * @param fenStr1
	 * @param fenStr2
	 * @return
	 */
	public static String fenPlus(String fenStr1, String fenStr2){
 		if (StringUtils.isNotBlank(fenStr1) && StringUtils.isNotBlank(fenStr2)) {
 			return new BigDecimal(fenStr1).add(new BigDecimal(fenStr2)).toPlainString();
 		} else if (StringUtils.isNotBlank(fenStr1) && StringUtils.isBlank(fenStr2)) {
 			return fenStr1;
 		} else if (StringUtils.isBlank(fenStr1) && StringUtils.isNotBlank(fenStr2)) {
 			return fenStr2;
 		} 
 		return "0";
 	}
 	
	/**
	 * 字符串金额：分金额相减
	 * 
	 * @param fenStr1
	 * @param fenStr2
	 * @return
	 */
	public static String fenSubtract(String fenStr1, String fenStr2){
 		if (StringUtils.isNotBlank(fenStr1) && StringUtils.isNotBlank(fenStr2)) {
 			return new BigDecimal(fenStr1).subtract(new BigDecimal(fenStr2)).toPlainString();
 		} else if (StringUtils.isNotBlank(fenStr1) && StringUtils.isBlank(fenStr2)) {
 			return fenStr1;
 		} else if (StringUtils.isBlank(fenStr1) && StringUtils.isNotBlank(fenStr2)) {
 			return new BigDecimal("0").subtract(new BigDecimal(fenStr2)).toPlainString();
 		} 
 		return "0";
 	}
	
	/**
	 * 金额字符串最大值验证（数据库可容纳最大值）
	 * 
	 * @param length 金额字段数据库最大长度
	 * @param fen 验证金额字符串(单位：分)
	 * @return
	 */
	public static boolean moneyMaxValidator(int length, String fen){

		String maxStr = "9";
		if (length > 1) {
			for (int i=0;i<length-1;i++){
				maxStr+="9";
			}
		}
		BigDecimal maxBigDecimal = new BigDecimal(maxStr);
		if (StringUtils.isBlank(fen)) {
			fen = "0";
		}
		BigDecimal fenBigDecimal = new BigDecimal(fen);
		if (maxBigDecimal.compareTo(fenBigDecimal) < 0) {
			return false;
		}
		return true;
	}
    
    public static String genId() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }
}
