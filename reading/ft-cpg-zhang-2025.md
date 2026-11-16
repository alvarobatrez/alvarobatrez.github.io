# FT-CPG: Learning Central Pattern Generators for Fault-Tolerant Quadruped Locomotion Under Multi-Joint Failures

*Pei Zhang, Zhaobo Hua, Qiyu Qiu, and Jinliang Ding — IEEE Robotics and Automation Letters (RA-L), Vol. 10, No. 7, July 2025* · [Paper on IEEE Xplore](https://ieeexplore.ieee.org/abstract/document/11012730)

---

## Handwriting Summary

- **Motivations:** Quadruped robots in rescue/exploration face sudden joint failures (locking or power loss) that cause falls and damage. Existing learning-based methods handle simple, single-type faults but struggle with multi-joint, mixed-type failures within one leg while maintaining full omnidirectional control ($x$, $y$, yaw).

- **Proposed Solution:** FT-CPG is a model-free RL framework using a biomimetic Central Pattern Generator (CPG). It employs section-wise training: a healthy policy $\pi^h$ generates nominal gaits, and a fault policy $\pi^f$ adjusts CPG parameters and adds bounded residual offsets $\Delta q \in [-0.5, 0.5]$ rad. A Transformer discriminator detects joint states from proprioception to gate $\pi^f$.

- **Evaluation:** In simulation (Unitree Go1), FT-CPG achieves 100% survival across all 27 single-leg fault states. It outperforms baselines in tracking accuracy, with a total average RMSE of 0.1758 versus 0.3893 for standard RL PD. Zero-shot sim-to-real transfer demonstrates distinct fault-tolerant gaits on hardware.

- **Contributions:** Introduces a decomposition strategy separating healthy and faulty gait distributions to avoid "homogeneous" failure modes. Provides the first robust solution for multi-joint, mixed-fault tolerance with full omnidirectional command tracking without hand-tuned joint constraints or curriculum learning.

- **Future Directions:** Develop unified policies for multi-leg failures (currently requires per-leg experts). Quantify real-world performance metrics (recovery time, fall rates) and test robustness against gradual/partial faults and discriminator misclassification.

<!-- To add an image: save the file in assets/img/ and uncomment the line below.
     The alt text becomes the figure caption. -->
<!-- ![Figure 2 — FT-CPG architecture overview](assets/img/ft-cpg-architecture.png) -->
