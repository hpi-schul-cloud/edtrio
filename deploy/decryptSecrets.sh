echo "decrypt secrets"

openssl aes-256-cbc -K $encrypted_b7bca0b0406c_key -iv $encrypted_b7bca0b0406c_iv -in travis_rsa.enc -out travis_rsa -d
chmod 600 travis_rsa
