pragma solidity >=0.4.21 <0.6.0;

contract Mock {

    event UnexpectedCall(uint index, address from, uint value, bytes input, bytes32 callHash);

    struct Expect {
        bytes32 callHash;
        bytes32 callReturn;
    }

    uint public expectationsCount;
    uint public nextExpectation = 1;
    uint public callsCount;
    mapping (uint => Expect) public expectations;
    mapping (bytes4 => bool) public ignores;

    function() external payable {
        if (ignores[msg.sig]) {
            /* solium-disable security/no-inline-assembly */
            assembly {
                mstore(0, 1)
                return (0, 32)
            }
        }
        callsCount++;
        bytes32 callHash = keccak256(abi.encodePacked(msg.sender, msg.value, msg.data));
        if (expectations[nextExpectation].callHash != callHash) {
            emit UnexpectedCall(nextExpectation, msg.sender, msg.value, msg.data, callHash);
            /* solium-disable security/no-inline-assembly */
            assembly {
                mstore(0, 0)
                return (0, 32)
            }
        }
        bytes32 result = expectations[nextExpectation++].callReturn;
        /* solium-disable security/no-inline-assembly */
        assembly {
            mstore(0, result)
            return (0, 32)
        }
    }

    function ignore(bytes4 _sig, bool _enabled) external {
        ignores[_sig] = _enabled;
    }

    function expect(address _from, uint _value, bytes memory _input, bytes32 _return) public {
        expectations[++expectationsCount] = Expect(keccak256(abi.encodePacked(_from, _value, _input)), _return);
    }

    function assertExpectations() public view {
        if (expectationsLeft() != 0 || callsCount != expectationsCount) {
            revert("Expectation is not met");
        }
    }

    function expectationsLeft() public view returns (uint) {
        return expectationsCount - (nextExpectation - 1);
    }

    function resetCallsCount() public {
        callsCount = 0;
    }
}
