
# Quantum Circuit Visualizer (Qiskit)

This project demonstrates basic quantum computing concepts using Qiskit:

- **Single Qubit Superposition**: $|0\rangle \xrightarrow{H} \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$
- **Bell State Entanglement**: $|00\rangle \xrightarrow{H \otimes I} \xrightarrow{CX} \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$

## Screenshots

![Circuit Diagram](screenshots/circuit.png)
![Histogram Output](screenshots/histogram.png)

## Quantum Concepts Used
- Superposition
- Entanglement
- Quantum Measurement

## How to Run
1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
2. Run the demo:
   ```
   python main.py
   ```

## Output
- Quantum circuit diagrams
- Probability histograms
- Terminal output with measurement results

## File Structure
- `main.py`: Main Python script
- `requirements.txt`: Dependencies
- `README.md`: Project overview
- `screenshots/`: (Add your screenshots here after running)

---

> After pushing to GitHub, add screenshots of your circuit and histogram outputs to the `screenshots/` folder for a more impressive README.
