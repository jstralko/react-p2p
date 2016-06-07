#-i interface
#-vvv more packet info
#-XXX ether header packet info
sudo tcpdump -i wlp4s0 host 192.30.253.124 -vvv -XXX
