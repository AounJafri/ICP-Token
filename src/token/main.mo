import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";


actor Token {
    Debug.print("hello");

    var owner : Principal = Principal.fromText("l67td-jipxz-yzap6-m3dpc-otovd-ivyq7-6r7wu-bt4v2-gwlxc-tlg6n-jae");
    var totalSupply: Nat = 1000000000;
    var symbol: Text = "AJANG";

     private stable var balanceEntries: [(Principal, Nat)] = [];

     private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    

    public query func balanceOf (who: Principal): async Nat {

        let balance: Nat = switch(balances.get(who)){
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    public query func getSymbol(): async Text{
        return symbol;
    };

    public shared(msg) func payOut(): async Text{

        // Debug.print(debug_show(msg.caller));
        if(balances.get(msg.caller) == null){
            let amount = 10000;
            // balances.put(msg.caller, amount);
            let result = await transferAmount(msg.caller,amount);
            return result;
        }else{
            return "Already claimed";
        }
    };

    public shared(msg) func transferAmount(transferTo: Principal, amount: Nat): async Text{


        let balance = await balanceOf(msg.caller);
        if(balance > amount ){

            balances.put(msg.caller,balance-amount);

            let newBal = await balanceOf(transferTo);

            balances.put(transferTo , newBal+amount);            
            return "Success";

        }else {
            return "Insufficient funds";
        }
    };

    system func preupgrade(){
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade(){
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if(balances.size() < 1 ){
            balances.put(owner, totalSupply);
        }
    };
};