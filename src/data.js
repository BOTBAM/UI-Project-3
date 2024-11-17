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
                                            "frameLength": 357 //bytes
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
                    "sourcePort": 60251,
                    "destinationPort": 80,
                    "payload": 303 //bytes
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
                                            "frameLength": 312 //bytes
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
                    "sourcePort": 80,
                    "destinationPort": 60251,
                    "payload": 270 //bytes
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
                                            "frameLength": 209 //bytes
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
                    "sourcePort": 39454,
                    "destinationPort": 80,
                    "payload": 158 //bytes
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
                                            "frameLength": 175 //bytes
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
                    "sourcePort": 80,
                    "destinationPort": 39454,
                    "payload": 270 //bytes
                },
            ],
            "protocol": "HTTP",
            "method": "200 OK",
            "timeCaptured": "1.35" //seconds
        },
    ]
};