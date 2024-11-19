import { writable } from "svelte/store";

export const packets = {
    "application": [
        {
            "transport": [
                {
                    "network": [
                        {
                            "dataLink": [
                                {
                                    "physical": [
                                        {
                                            "frameLength": "357" // bytes
                                        }
                                    ],
                                    "type": "IPv4",
                                    "sourceMAC": "34:51:aa:3c:e1:ff",
                                    "destinationMAC": "2d:55:b6:db:78:93"
                                }
                            ],
                            "protocol": "IP",
                            "source": "192.168.10.200",
                            "destination": "40.122.250.55",
                            "info": "Request for homepage of server"
                        }
                    ],
                    "protocol": "TCP",
                    "sourcePort": "60251",
                    "destinationPort": "80",
                    "payload": "303" // bytes
                }
            ],
            "protocol": "HTTP",
            "method": "GET",
            "timeCaptured": "1.20" // seconds
        },
        {
            "transport": [
                {
                    "network": [
                        {
                            "dataLink": [
                                {
                                    "physical": [
                                        {
                                            "frameLength": "312" // bytes
                                        }
                                    ],
                                    "type": "IPv4",
                                    "sourceMAC": "2d:55:b6:db:78:93",
                                    "destinationMAC": "34:51:aa:3c:e1:ff"
                                }
                            ],
                            "protocol": "IP",
                            "source": "40.122.250.55",
                            "destination": "192.168.10.200",
                            "info": "Response: Successfully fetched content"
                        }
                    ],
                    "protocol": "TCP",
                    "sourcePort": "80",
                    "destinationPort": "60251",
                    "payload": "270" // bytes
                }
            ],
            "protocol": "HTTP",
            "method": "200 OK",
            "timeCaptured": "1.25" // seconds
        },
        {
            "transport": [
                {
                    "network": [
                        {
                            "dataLink": [
                                {
                                    "physical": [
                                        {
                                            "frameLength": "278" // bytes
                                        }
                                    ],
                                    "type": "IPv4",
                                    "sourceMAC": "3f:a2:b3:3d:ff:ec",
                                    "destinationMAC": "ab:34:e2:c9:65:de"
                                }
                            ],
                            "protocol": "IP",
                            "source": "10.10.10.2",
                            "destination": "192.168.1.5",
                            "info": "GET request for large dataset"
                        }
                    ],
                    "protocol": "TCP",
                    "sourcePort": "4500",
                    "destinationPort": "443",
                    "payload": "512" // bytes
                }
            ],
            "protocol": "HTTPS",
            "method": "GET",
            "timeCaptured": "1.45" // seconds
        },
        {
            "transport": [
                {
                    "network": [
                        {
                            "dataLink": [
                                {
                                    "physical": [
                                        {
                                            "frameLength": "450" // bytes
                                        }
                                    ],
                                    "type": "IPv4",
                                    "sourceMAC": "a2:bc:56:78:9f:10",
                                    "destinationMAC": "12:34:ab:78:cd:ef"
                                }
                            ],
                            "protocol": "IP",
                            "source": "192.168.2.3",
                            "destination": "172.16.0.2",
                            "info": "Encrypted handshake initiated"
                        }
                    ],
                    "protocol": "UDP",
                    "sourcePort": "500",
                    "destinationPort": "4500",
                    "payload": "180" // bytes
                }
            ],
            "protocol": "IKEv2",
            "method": "Handshake",
            "timeCaptured": "1.75" // seconds
        },
        {
            "transport": [
                {
                    "network": [
                        {
                            "dataLink": [
                                {
                                    "physical": [
                                        {
                                            "frameLength": "512" // bytes
                                        }
                                    ],
                                    "type": "IPv6",
                                    "sourceMAC": "34:51:aa:3c:e1:ff",
                                    "destinationMAC": "2d:55:b6:db:78:93"
                                }
                            ],
                            "protocol": "IP",
                            "source": "fe80::1",
                            "destination": "fe80::2",
                            "info": "Large IPv6 packet transmission"
                        }
                    ],
                    "protocol": "TCP",
                    "sourcePort": "80",
                    "destinationPort": "443",
                    "payload": "480" // bytes
                }
            ],
            "protocol": "HTTP",
            "method": "GET",
            "timeCaptured": "2.00" // seconds
        },
        {
            "transport": [
                {
                    "network": [
                        {
                            "dataLink": [
                                {
                                    "physical": [
                                        {
                                            "frameLength": "600" // bytes
                                        }
                                    ],
                                    "type": "IPv4",
                                    "sourceMAC": "ed:da:11:64:7c:96",
                                    "destinationMAC": "77:3d:cf:bb:13:92"
                                }
                            ],
                            "protocol": "IP",
                            "source": "40.150.213.42",
                            "destination": "192.168.1.100",
                            "info": "Streaming request data for video"
                        }
                    ],
                    "protocol": "UDP",
                    "sourcePort": "9000",
                    "destinationPort": "8000",
                    "payload": "512" // bytes
                }
            ],
            "protocol": "RTP",
            "method": "PUBLISH",
            "timeCaptured": "2.35" // seconds
        },
        {
            "transport": [
                {
                    "network": [
                        {
                            "dataLink": [
                                {
                                    "physical": [
                                        {
                                            "frameLength": "540" // bytes
                                        }
                                    ],
                                    "type": "IPv4",
                                    "sourceMAC": "de:66:41:3e:fa:d2",
                                    "destinationMAC": "2b:cc:15:87:bf:f4"
                                }
                            ],
                            "protocol": "IP",
                            "source": "192.168.1.101",
                            "destination": "10.0.0.10",
                            "info": "Keep-alive packet for TCP session"
                        }
                    ],
                    "protocol": "TCP",
                    "sourcePort": "443",
                    "destinationPort": "8443",
                    "payload": "64" // bytes
                }
            ],
            "protocol": "HTTP",
            "method": "HEAD",
            "timeCaptured": "2.50" // seconds
        }
    ]
};
