package tools;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.security.Key;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;
import javax.crypto.spec.IvParameterSpec;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;

/** 
 * 3DES加密工具类 
 */
public class DES3Util {
    // 密钥  
    //private final static String secretKey = "aX/82tHv+FdOjvWbrJ6pDfg0UaCdrtef" ;// TODO他方提供
    // 向量  
    //private final static String iv = "01234567" ;  // TODO他方提供
    // 加解密统一使用的编码方式  
    //private final static String encoding = "utf-8" ;  // TODO他方提供
       
    /** 
     * 3DES加密 
     *  
     * @param plainText 普通文本 
     * @param secretKey 密钥   
     * @param iv 初始化向量 
     * @param encoding 加解密统一使用的编码方式 
     * @return 
     * @throws Exception  
     */ 
    public static String encode(String plainText, String secretKey, String iv, String encoding) throws Exception {  
        Key deskey = null ;  
        DESedeKeySpec spec = new DESedeKeySpec(secretKey.getBytes());  
        SecretKeyFactory keyfactory = SecretKeyFactory.getInstance( "desede" );  
        deskey = keyfactory.generateSecret(spec);  
       
        Cipher cipher = Cipher.getInstance( "desede/CBC/PKCS5Padding" );  
        IvParameterSpec ips = new IvParameterSpec(iv.getBytes());  
        cipher.init(Cipher.ENCRYPT_MODE, deskey, ips);  
        byte [] encryptData = cipher.doFinal(plainText.getBytes(encoding));  
        //return Base64.encode(encryptData);
        return Base64.encodeBase64String(encryptData);
    }  
       
    /** 
     * 3DES解密 
     *  
     * @param encryptText 加密文本 
     * @param secretKey 密钥   
     * @param iv 初始化向量 
     * @param encoding 加解密统一使用的编码方式 
     * @return 
     * @throws Exception 
     */ 
    public static String decode(String encryptText, String secretKey, String iv, String encoding) throws Exception {  
        Key deskey = null ;  
        DESedeKeySpec spec = new DESedeKeySpec(secretKey.getBytes());   
        SecretKeyFactory keyfactory = SecretKeyFactory.getInstance( "desede" );  
        deskey = keyfactory.generateSecret(spec);  
        Cipher cipher = Cipher.getInstance( "desede/CBC/PKCS5Padding" );  
        IvParameterSpec ips = new IvParameterSpec(iv.getBytes());  
        cipher.init(Cipher.DECRYPT_MODE, deskey, ips);  
       
        //byte [] decryptData = cipher.doFinal(Base64.decode(encryptText));
        byte [] decryptData = cipher.doFinal(Base64.decodeBase64(encryptText));  
       
        return new String(decryptData, encoding);  
    }  
    
   public static String padding(String str) {
       byte[] oldByteArray;
       try {
           oldByteArray = str.getBytes("UTF8");
           int numberToPad = 8 - oldByteArray.length % 8;
           byte[] newByteArray = new byte[oldByteArray.length + numberToPad];
           System.arraycopy(oldByteArray, 0, newByteArray, 0,
                   oldByteArray.length);
           for (int i = oldByteArray.length; i < newByteArray.length; ++i) {
               newByteArray[i] = 0;
           }
           return new String(newByteArray, "UTF8");
       } catch (UnsupportedEncodingException e) {
           System.out.println("Crypter.padding UnsupportedEncodingException");
       }
       return null;
   }
    
    public static void main(String[] args) throws Exception{
//        String plainText = "来自http://my.oschina.net/penngo的博客";
//        String encryptText = DES3Util.encode(plainText);
//        System.out.println(encryptText);
//        System.out.println(DES3Util.decode(encryptText));
        String secretKey = "aX/82tHv+FdOjvWbrJ6pDfg0UaCdrtef" ;
        String iv = "01234567";
        String encoding = "utf-8" ;
        
        String response = FileUtils.readFileToString(new File("D:\\DES3Test\\test.txt"));
        String result = decode(response, secretKey, iv, encoding);
        System.out.println(result);
    }
}
