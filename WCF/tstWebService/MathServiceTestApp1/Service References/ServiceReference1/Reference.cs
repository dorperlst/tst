﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MathServiceTestApp1.ServiceReference1 {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="ServiceReference1.IMathService")]
    public interface IMathService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMathService/Add", ReplyAction="http://tempuri.org/IMathService/AddResponse")]
        int Add(int piNum1, int piNum2);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMathService/tstAdd", ReplyAction="http://tempuri.org/IMathService/tstAddResponse")]
        int tstAdd(int piNum1, int piNum2);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMathService/Subtract", ReplyAction="http://tempuri.org/IMathService/SubtractResponse")]
        int Subtract(int piNum1, int piNum2);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMathService/Multiply", ReplyAction="http://tempuri.org/IMathService/MultiplyResponse")]
        int Multiply(int piNum1, int piNum2);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMathService/Divide", ReplyAction="http://tempuri.org/IMathService/DivideResponse")]
        int Divide(int piNum1, int piNum2);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IMathServiceChannel : MathServiceTestApp1.ServiceReference1.IMathService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class MathServiceClient : System.ServiceModel.ClientBase<MathServiceTestApp1.ServiceReference1.IMathService>, MathServiceTestApp1.ServiceReference1.IMathService {
        
        public MathServiceClient() {
        }
        
        public MathServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public MathServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public MathServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public MathServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public int Add(int piNum1, int piNum2) {
            return base.Channel.Add(piNum1, piNum2);
        }
        
        public int tstAdd(int piNum1, int piNum2) {
            return base.Channel.tstAdd(piNum1, piNum2);
        }
        
        public int Subtract(int piNum1, int piNum2) {
            return base.Channel.Subtract(piNum1, piNum2);
        }
        
        public int Multiply(int piNum1, int piNum2) {
            return base.Channel.Multiply(piNum1, piNum2);
        }
        
        public int Divide(int piNum1, int piNum2) {
            return base.Channel.Divide(piNum1, piNum2);
        }
    }
}