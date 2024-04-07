const UserHistoryABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "ownerGroupContractAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "doDailyCheckIn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "checkDuplicateCheckIn",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "enum UserHistory.ActType",
						"name": "act_type",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "tor_changes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tor_balance",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "count_invitee",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "activity_points",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deposit_points",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "total_points",
						"type": "uint256"
					}
				],
				"internalType": "struct UserHistory.ActVals[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "page",
				"type": "uint256"
			}
		],
		"name": "getHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "enum UserHistory.ActType",
						"name": "act_type",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "tor_changes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tor_balance",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "count_invitee",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "activity_points",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deposit_points",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "total_points",
						"type": "uint256"
					}
				],
				"internalType": "struct UserHistory.ActVals[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "page",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "count_per_page",
				"type": "uint256"
			}
		],
		"name": "getHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "enum UserHistory.ActType",
						"name": "act_type",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "tor_changes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tor_balance",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "count_invitee",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "activity_points",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deposit_points",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "total_points",
						"type": "uint256"
					}
				],
				"internalType": "struct UserHistory.ActVals[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getHistoryLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getLastHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "enum UserHistory.ActType",
						"name": "act_type",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "tor_changes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tor_balance",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "count_invitee",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "activity_points",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deposit_points",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "total_points",
						"type": "uint256"
					}
				],
				"internalType": "struct UserHistory.ActVals",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyRank",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getMyRank",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRank",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "account",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "point",
						"type": "uint256"
					}
				],
				"internalType": "struct UserHistory.RankVals[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalPoints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalUsers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export default UserHistoryABI;
