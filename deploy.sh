#! /bin/bash

eval "echo \"$(cat k8s/kubeconfig.yml)\"" > k8s/kube.conf
export KUBECONFIG=k8s/kube.conf
cat k8s/kube.conf
kubectl apply -f "k8s/edtrio-client-deployment.yml"
# kubectl apply -f "k8s/service.yaml"
# kubectl apply -f "k8s/ingress.yaml"
exit 0
