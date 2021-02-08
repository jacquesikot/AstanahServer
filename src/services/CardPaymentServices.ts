//import crypto from 'crypto';
import forge from 'node-forge';

function encrypt(key: any, text: string) {
  var cipher = forge.cipher.createCipher(
    '3DES-ECB',
    forge.util.createBuffer(key)
  );
  cipher.start({ iv: '' });
  cipher.update(forge.util.createBuffer(text, 'utf8'));
  cipher.finish();
  var encrypted = cipher.output;
  return forge.util.encode64(encrypted.getBytes());
}

export default {
  encrypt,
};
