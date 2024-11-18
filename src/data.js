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
                                            "frameLength": "357" //bytes
                                        }
                                    ],
                                    "type": "IPv4",
                                    "sourceMAC": "34:51:aa:3c:e1:ff",
                                    "destinationMAC": "2d:55:b6:db:78:93"
                                }
                            ],
                            "protocol": "IP",
                            "source": "192.168.10.200",
                            "destination": "40.122.250.55"
                        }
                    ],
                    "protocol": "TCP",
                    "sourcePort": "60251",
                    "destinationPort": "80",
                    "payload": "303" //bytes
                },
            ],
            "protocol": "HTTP",
            "method": "GET",
            "timeCaptured": "1.20" //seconds
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
                                            "frameLength": "312" //bytes
                                        }
                                    ],
                                    "type": "IPv4",
                                    "sourceMAC": "2d:55:b6:db:78:93",
                                    "destinationMAC": "34:51:aa:3c:e1:ff"
                                }
                            ],
                            "protocol": "IP",
                            "source": "40.122.250.55",
                            "destination": "192.168.10.200"
                        }
                    ],
                    "protocol": "TCP",
                    "sourcePort": "80",
                    "destinationPort": "60251",
                    "payload": "270" //bytes
                },
            ],
            "protocol": "HTTP",
            "method": "200 OK",
            "timeCaptured": "1.25" //seconds
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
                                            "frameLength": "209" //bytes
                                        }
                                    ],
                                    "type": "IPv4",
                                    "sourceMAC": "2b:cc:15:87:bf:f4",
                                    "destinationMAC": "de:66:41:3e:fa:d2"
                                }
                            ],
                            "protocol": "IP",
                            "source": "192.168.15.178",
                            "destination": "42.145.220.34"
                        }
                    ],
                    "protocol": "TCP",
                    "sourcePort": "39454",
                    "destinationPort": "80",
                    "payload": "158" //bytes
                },
            ],
            "protocol": "HTTP",
            "method": "GET",
            "timeCaptured": "1.30" //seconds
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
                                            "frameLength": "175" //bytes
                                        }
                                    ],
                                    "type": "IPv4",
                                    "sourceMAC": "de:66:41:3e:fa:d2",
                                    "destinationMAC": "2b:cc:15:87:bf:f4"
                                }
                            ],
                            "protocol": "IP",
                            "source": "42.145.220.34",
                            "destination": "192.168.15.178"
                        }
                    ],
                    "protocol": "TCP",
                    "sourcePort": "80",
                    "destinationPort": "39454",
                    "payload": "270" //bytes
                },
            ],
            "protocol": "HTTP",
            "method": "200 OK",
            "timeCaptured": "1.35" //seconds
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
                                            "frameLength": "413" //bytes
                                        }
                                    ],
                                    "type": "IPv4",
                                    "sourceMAC": "77:3d:cf:bb:13:92",
                                    "destinationMAC": "ed:da:11:64:7c:96"
                                }
                            ],
                            "protocol": "IP",
                            "source": "192.168.10.242",
                            "destination": "42.140.231.35"
                        }
                    ],
                    "protocol": "TCP",
                    "sourcePort": "43550",
                    "destinationPort": "80",
                    "payload": "317" //bytes
                },
            ],
            "protocol": "HTTP",
            "method": "GET",
            "timeCaptured": "1.40" //seconds
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
                                            "frameLength": "332" //bytes
                                        }
                                    ],
                                    "type": "IPv4",
                                    "sourceMAC": "ed:da:11:64:7c:96",
                                    "destinationMAC": "77:3d:cf:bb:13:92"
                                }
                            ],
                            "protocol": "IP",
                            "source": "42.140.231.35",
                            "destination": "192.168.10.242"
                        }
                    ],
                    "protocol": "TCP",
                    "sourcePort": "80",
                    "destinationPort": "43550",
                    "payload": "298" //bytes
                },
            ],
            "protocol": "HTTP",
            "method": "200 OK",
            "timeCaptured": "1.45" //seconds
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
                                            "frameLength": "278" //bytes
                                        }
                                    ],
                                    "type": "IPv4",
                                    "sourceMAC": "d5:ab:82:12:ef:99",
                                    "destinationMAC": "18:83:a3:66:34:e2"
                                }
                            ],
                            "protocol": "IP",
                            "source": "192.168.10.213",
                            "destination": "41.142.210.52"
                        }
                    ],
                    "protocol": "TCP",
                    "sourcePort": "47213",
                    "destinationPort": "80",
                    "payload": "211" //bytes
                },
            ],
            "protocol": "HTTP",
            "method": "GET",
            "timeCaptured": "1.50" //seconds
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
                                            "frameLength": "225" //bytes
                                        }
                                    ],
                                    "type": "IPv4",
                                    "sourceMAC": "18:83:a3:66:34:e2",
                                    "destinationMAC": "d5:ab:82:12:ef:99"
                                }
                            ],
                            "protocol": "IP",
                            "source": "41.142.210.52",
                            "destination": "192.168.10.213"
                        }
                    ],
                    "protocol": "TCP",
                    "sourcePort": "80",
                    "destinationPort": "47213",
                    "payload": "200" //bytes
                },
            ],
            "protocol": "HTTP",
            "method": "200 OK",
            "timeCaptured": "1.55" //seconds
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
                                            "frameLength": "423" //bytes
                                        }
                                    ],
                                    "type": "IPv4",
                                    "sourceMAC": "15:51:85:fc:24:82",
                                    "destinationMAC": "aa:b1:65:48:41:22"
                                }
                            ],
                            "protocol": "IP",
                            "source": "192.168.10.188",
                            "destination": "40.150.213.42"
                        }
                    ],
                    "protocol": "TCP",
                    "sourcePort": "43552",
                    "destinationPort": "80",
                    "payload": "354" //bytes
                },
            ],
            "protocol": "HTTP",
            "method": "GET",
            "timeCaptured": "1.60" //seconds
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
                                            "frameLength": "379" //bytes
                                        }
                                    ],
                                    "type": "IPv4",
                                    "sourceMAC": "aa:b1:65:48:41:22",
                                    "destinationMAC": "15:51:85:fc:24:82"
                                }
                            ],
                            "protocol": "IP",
                            "source": "40.150.213.42",
                            "destination": "192.168.10.188"
                        }
                    ],
                    "protocol": "TCP",
                    "sourcePort": "80",
                    "destinationPort": "43552",
                    "payload": "341" //bytes
                },
            ],
            "protocol": "HTTP",
            "method": "200 OK",
            "timeCaptured": "1.65" //seconds
        }
    ]
};