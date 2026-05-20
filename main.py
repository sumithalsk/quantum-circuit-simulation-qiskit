"""
Qiskit Beginner Demo
Demonstrates:
1. Single qubit superposition
2. Bell state entanglement
3. Measurement visualization using histograms
"""


from qiskit import QuantumCircuit
from qiskit_aer import Aer
from qiskit import transpile
from qiskit.visualization import plot_histogram
import matplotlib.pyplot as plt
import os

# 1. Single Qubit Superposition
def single_qubit_superposition():
    print("\n--- Single Qubit Superposition ---")
    qc = QuantumCircuit(1, 1)
    qc.h(0)  # Apply Hadamard gate to create superposition
    qc.measure(0, 0)
    # Save circuit diagram
    circuit_path = os.path.join("screenshots", "circuit_single.png")
    qc.draw(output="mpl").savefig(circuit_path)
    print(f"Circuit diagram saved to {circuit_path}")
    simulator = Aer.get_backend('aer_simulator')
    tqc = transpile(qc, simulator)
    result = simulator.run(tqc, shots=1024).result()
    counts = result.get_counts()
    print("Measurement results:", counts)
    # Save histogram
    hist_path = os.path.join("screenshots", "histogram_single.png")
    plot_histogram(counts).savefig(hist_path)
    print(f"Histogram saved to {hist_path}")
    plt.title("Single Qubit Superposition")
    plt.show()

# 2. Bell State Entanglement
def bell_state_entanglement():
    print("\n--- Bell State Entanglement ---")
    qc = QuantumCircuit(2, 2)
    qc.h(0)      # Put qubit 0 in superposition
    qc.cx(0, 1)  # Entangle qubit 0 with qubit 1
    qc.measure([0, 1], [0, 1])
    # Save circuit diagram
    circuit_path = os.path.join("screenshots", "circuit_bell.png")
    qc.draw(output="mpl").savefig(circuit_path)
    print(f"Circuit diagram saved to {circuit_path}")
    simulator = Aer.get_backend('aer_simulator')
    tqc = transpile(qc, simulator)
    result = simulator.run(tqc, shots=1024).result()
    counts = result.get_counts()
    print("Measurement results:", counts)
    # Save histogram
    hist_path = os.path.join("screenshots", "histogram_bell.png")
    plot_histogram(counts).savefig(hist_path)
    print(f"Histogram saved to {hist_path}")
    plt.title("Bell State Entanglement")
    plt.show()

def main():
    single_qubit_superposition()
    bell_state_entanglement()

if __name__ == "__main__":
    main()
